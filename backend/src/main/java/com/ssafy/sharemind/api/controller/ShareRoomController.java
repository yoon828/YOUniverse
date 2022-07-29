package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.request.ShareRoomDetailDto;
import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.service.ShareRoomService;
import com.ssafy.sharemind.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/history")
public class ShareRoomController {

    private final ShareRoomService shareRoomService;

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody ShareRoomInsertDto shareRoomInsertDto){
        return new ResponseEntity<>(new Response<>("true","쉐어룸히스토리 정보 등룍 완료",
                shareRoomService.insertShareRoomHistory(shareRoomInsertDto)), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getRoomList(@RequestHeader("authorization") String authorization){
        return new ResponseEntity<>(new Response<>("true","쉐어룸히스토리 리스트 조회 완료",
                shareRoomService.getShareRoomHistoryByUuid(authorization.replace("Bearer ", ""))),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getRoom(@RequestBody ShareRoomDetailDto shareRoomDetailDto){
        return new ResponseEntity<>(new Response<>("true","쉐어룸 상세정보 조회 완료",
                shareRoomService.getShareRoomHistoryById(shareRoomDetailDto)),HttpStatus.OK);
    }


}
