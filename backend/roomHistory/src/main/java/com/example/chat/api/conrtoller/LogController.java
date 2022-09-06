package com.example.chat.api.conrtoller;

import com.example.chat.api.dto.LogDtoRequest;
import com.example.chat.api.exception.HistoryException;
import com.example.chat.api.exception.LogDuplicationException;
import com.example.chat.api.exception.LogNotFoundException;
import com.example.chat.api.service.LogService;
import com.example.chat.api.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/logs")
public class LogController {

    private final LogService logService;
    private final ResponseService responseService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogById(@PathVariable String id) {
        try {
            return new ResponseEntity<>(responseService.getSingleResult(
                    logService.getLogById(id), "대화 로그를 가져왔습니다."), HttpStatus.OK);
        } catch (LogNotFoundException e) {
            return new ResponseEntity<>(
                    responseService.getFailureResult("대화 로그를 가져오는데 실패했습니다."), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping
    public ResponseEntity<?> insertLog(@RequestHeader("authorization") String authorization, @RequestBody LogDtoRequest logDto) {
        try {
            logService.insertLog(authorization.replace("Bearer ", ""), logDto);

            return new ResponseEntity<>(responseService.getSuccessResult(
                    "히스토리를 정상적으로 저장했습니다."), HttpStatus.OK);
        } catch (LogDuplicationException e) {
            return new ResponseEntity<>(
                    responseService.getFailureResult("해당하는 id의 대화 로그가 존재합니다."), HttpStatus.BAD_REQUEST);
        } catch (HistoryException e) {
            return new ResponseEntity<>(
                    responseService.getFailureResult("히스토리를 저장하지 못했습니다."), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLog(@PathVariable String id) {
        try {
            logService.deleteLog(id);

            return new ResponseEntity<>(responseService.getSuccessResult(
                    "대화 로그를 정상적으로 삭제했습니다."), HttpStatus.OK);
        } catch (LogNotFoundException e) {
            return new ResponseEntity<>(
                    responseService.getFailureResult("삭제할 대화로그를 찾지 못했습니다."), HttpStatus.BAD_REQUEST);
        }
    }
}
