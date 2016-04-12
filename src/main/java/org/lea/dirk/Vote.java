package org.lea.dirk;

import javax.persistence.*;
import java.util.Date;

// for H2:
    // table is created on request.
// for postgres:
   // drop table vote
   // create table vote (id SERIAL UNIQUE PRIMARY KEY , uuid varchar(50), color varchar(25), comment text, timestamp timestamp  );

@Entity
public class Vote {

    // For H2:
    // @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;
// For Postgres:
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vote_seq_gen")
    @SequenceGenerator(name = "vote_seq_gen", sequenceName = "vote_id_seq")
    private Integer id;

    private String uuid;
    private String color;
    private String comment;
    private Date timestamp;

    public Integer getId() {
        return id;
    }

    public Vote setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getUuid() {
        return uuid;
    }

    public Vote setUuid(String uuid) {
        this.uuid = uuid;
        return this;
    }

    public String getColor() {
        return color;
    }

    public Vote setColor(String color) {
        this.color = color;
        return this;
    }

    public String getComment() {
        return comment;
    }

    public Vote setComment(String comment) {
        this.comment = comment;
        return this;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public Vote setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        timestamp = new Date();
    }

    public Vote() {
    }

    public Vote(String uuid, String color, String comment) {
        this.uuid = uuid;
        this.color = color;
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "Vote{" +
                "uuid='" + uuid + '\'' +
                ", color='" + color + '\'' +
                ", comment='" + comment + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }

}
