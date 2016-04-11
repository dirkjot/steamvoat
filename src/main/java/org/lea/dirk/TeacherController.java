package org.lea.dirk;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<Vote> rawVoteList() {
        // paging and sorting request for page 0 with 500 items on it, sorted by timestamp:
        Page<Vote> result = voteRepository.findAll(new PageRequest(0, 500, new Sort(Sort.Direction.DESC, "timestamp")));
        return result;
    }
}
