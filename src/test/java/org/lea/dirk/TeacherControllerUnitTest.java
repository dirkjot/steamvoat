package org.lea.dirk;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



public class TeacherControllerUnitTest {


    @Test
    public void testRawVoteList() throws Exception {
        VoteRepository mockVoteRepository = mock(VoteRepository.class);
        List<Vote> votes = new ArrayList<Vote>();
        votes.add(new Vote("testbed", "blue", "testing 123"));
        when(mockVoteRepository.findLast500()).thenReturn(votes);
        TeacherController subject = new TeacherController(mockVoteRepository);
        Iterable<Vote> results = subject.rawVoteList();
        assertThat(results).hasSize(1);
    }


}