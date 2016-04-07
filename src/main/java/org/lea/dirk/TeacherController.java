package org.lea.dirk;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;
import java.util.List;

@RestController
public class TeacherController {

    private VoteRepository voteRepository;

    @Autowired
    public TeacherController(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    /** Return the last 500 votes with most recent vote on top
     *
     * @return Iterable of vote objects, json version via jackson
     */
    @RequestMapping("/teacher/rawlist")
    public Iterable<Vote> rawVoteList() {
        Iterable<Vote> result = voteRepository.findLast500();
        return result;



    }
}
