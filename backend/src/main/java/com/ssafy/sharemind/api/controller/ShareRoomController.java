package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.service.ShareRoomService;
import com.ssafy.sharemind.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/room")
public class ShareRoomController {

    private final ShareRoomService shareRoomService;

    @PostMapping
    public ResponseEntity insert(@RequestBody ShareRoomInsertDto shareRoomInsertDto){
        return new ResponseEntity<>(new Response<>("true","쉐어룸히스토리 정보 등룍 완료",
                shareRoomService.insertShareRoomHistory(shareRoomInsertDto)), HttpStatus.CREATED);
    }


}
