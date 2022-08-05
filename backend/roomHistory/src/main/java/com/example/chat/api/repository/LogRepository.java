package com.example.chat.api.repository;

import com.example.chat.api.document.LogDoc;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRepository extends MongoRepository<LogDoc, String> {

}
