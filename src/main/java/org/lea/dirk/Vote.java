package org.lea.dirk;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Vote {
    @Id @GeneratedValue
    private Long id;
    private String uuid;
    private String color;
    private String comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
                "uuid=" + uuid +
                ", color='" + color + '\'' +
                ", comment='" + comment + '\'' +
                '}';
    }
}
