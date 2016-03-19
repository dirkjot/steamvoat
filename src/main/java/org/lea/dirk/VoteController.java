package org.lea.dirk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by pivotal on 3/18/16.
 */

@RestController
public class VoteController {

    @RequestMapping("/api/vote/{color}/vote")
    public String vote(@RequestParam String color) {
        return "";

    }

}
