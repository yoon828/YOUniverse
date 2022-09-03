package com.ssafy.sharemind.db.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Admin {

    @Id
    @Column(length = 50)
    private String uuid;

}
