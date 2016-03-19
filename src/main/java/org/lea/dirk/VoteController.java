package org.lea.dirk;

import org.springframework.web.bind.annotation.*;

@RestController
public class VoteController {

    @RequestMapping(value="/api/vote", method=RequestMethod.POST)
    public String vote(@RequestBody String color) {
        System.out.println(color);
        return "[\"ok\"]";

    }


    @RequestMapping(value="/api/comment", method= RequestMethod.POST)
    public String comment(@RequestBody String comment) {
        System.out.println(comment);
        return "[\"ok\"]";


    }


}


