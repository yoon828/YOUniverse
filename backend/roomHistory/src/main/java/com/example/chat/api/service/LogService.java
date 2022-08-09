package com.example.chat.api.service;

import com.example.chat.api.document.Chat;
import com.example.chat.api.document.LogDoc;
import com.example.chat.api.dto.*;
import com.example.chat.api.exception.HistoryException;
import com.example.chat.api.exception.LogDuplicationException;
import com.example.chat.api.exception.LogNotFoundException;
import com.example.chat.api.jwt.TokenProvider;
import com.example.chat.api.repository.LogRepository;
import com.mongodb.MongoWriteException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;
    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;
    private final Environment env;


    public LogDto getLogById(String id) {
        LogDoc logDoc = logRepository.findById(id).orElseThrow(() -> new LogNotFoundException("대화 로그를 찾을 수 없습니다."));

        return LogDto.builder()
                .id(logDoc.getId())
                .sessionId(logDoc.getSessionId())
                .createTime(logDoc.getCreateTime())
                .participants(logDoc.getParticipants())
                .chats(logDoc.getChats()
                        .stream()
                        .map(chat -> ChatDto.builder()
                                .name(chat.getName())
                                .chatTime(chat.getChatTime())
                                .content(chat.getContent())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public void insertLog(String accessToken, LogDtoRequest logDto) {
        String uuid = tokenProvider.getUserUuid(accessToken);
        String id = String.valueOf((uuid.hashCode() + LocalDateTime.now().hashCode()) & 0x7fffffff);

        LogDoc logDoc = logRepository.findById(id)
                .orElse(null);

        if (logDoc != null) {
            id = String.valueOf(id.hashCode());
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("authorization", "Bearer " + accessToken);

        HttpEntity<Object> request = new HttpEntity<>(HistoryDto.builder()
                .logId(logDto.getSessionId() != null ? id : null)
                .hostName(logDto.getHostName())
                .roomName(logDto.getRoomName())
                .participants(logDto.getParticipants())
                .createTime(logDto.getCreateTime())
                .build(), httpHeaders);

        // RestTemplate 사용
        // restTemplate 의 exchange 메서드 (주소, HTTP 메서드, request 할때 데이터 파라미터 타입, 반환 파라미터 타입)
        ResponseEntity<Result> result = restTemplate.exchange(env.getProperty("history.url"),
                HttpMethod.POST, request, Result.class);

        if (result.getStatusCode() != HttpStatus.CREATED) {
            throw new HistoryException();
        }

        if (logDto.getSessionId() != null) {
            logRepository.insert(LogDoc.builder()
                    .id(id)
                    .sessionId(logDto.getSessionId())
                    .createTime(logDto.getCreateTime())
                    .participants(logDto.getParticipants())
                    .chats(logDto.getChats()
                            .stream()
                            .map(chat -> Chat.builder()
                                    .name(chat.getName())
                                    .chatTime(chat.getChatTime())
                                    .content(chat.getContent())
                                    .build())
                            .collect(Collectors.toList()))
                    .build());
        }

    }

    public void deleteLog(String id) {

        logRepository.findById(id).orElseThrow(() -> new LogNotFoundException("대화 로그를 찾을 수 없습니다."));
        logRepository.deleteById(id);
    }

}
