package com.example.chat.api.service;

import com.example.chat.api.document.Chat;
import com.example.chat.api.document.LogDoc;
import com.example.chat.api.dto.ChatDto;
import com.example.chat.api.dto.LogDto;
import com.example.chat.api.exception.LogDuplicationException;
import com.example.chat.api.exception.LogNotFoundException;
import com.example.chat.api.repository.LogRepository;
import com.mongodb.MongoWriteException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;

    public LogDto getLogById(String id) {
        LogDoc logDoc = logRepository.findById(id).orElseThrow(() -> new LogNotFoundException("대화 로그를 찾을 수 없습니다."));

        return LogDto.builder()
                .id(logDoc.getId())
                .sessionId(logDoc.getSessionId())
                .createTime(Timestamp.valueOf(logDoc.getCreateTime()))
                .participant(logDoc.getParticipant())
                .chats(logDoc.getChats()
                        .stream()
                        .map(chat -> ChatDto.builder()
                                .name(chat.getName())
                                .chatTime(Timestamp.valueOf(chat.getChatTime()))
                                .content(chat.getContent())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public void insertLog(LogDto logDto) {

        LogDoc logDoc = logRepository.findById(logDto.getId())
                .orElse(null);

        if (logDoc != null) {
            throw new LogDuplicationException();
        }

        logRepository.insert(LogDoc.builder()
                .id(logDto.getId())
                .sessionId(logDto.getSessionId())
                .createTime(logDto.getCreateTime().toLocalDateTime())
                .participant(logDto.getParticipant())
                .chats(logDto.getChats()
                        .stream()
                        .map(chat -> Chat.builder()
                                .name(chat.getName())
                                .chatTime(chat.getChatTime().toLocalDateTime())
                                .content(chat.getContent())
                                .build())
                        .collect(Collectors.toList()))
                .build());
    }

    public void deleteLog(String id) {
        logRepository.findById(id).orElseThrow(() -> new LogNotFoundException("대화 로그를 찾을 수 없습니다."));

        logRepository.deleteById(id);
    }
}
