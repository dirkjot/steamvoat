package org.lea.dirk;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.Date;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class TeacherControllerUnitTest {

    private VoteRepository mockVoteRepository;
    private ArrayList<Vote> votes;

    @Before
    public void setUp() throws Exception {
        mockVoteRepository = mock(VoteRepository.class);
        votes = new ArrayList<Vote>();
    }

    @Test
    public void testRawVoteList_ReturnsListOfOne() throws Exception {
        votes.add(new Vote("testbed", "blue", "testing 123"));
        Page page = new PageImpl<Vote>(votes);
        when(mockVoteRepository.findAll(any(PageRequest.class))).thenReturn(page);

        TeacherController subject = new TeacherController(mockVoteRepository);
        Iterable<Vote> results = subject.rawVoteList();
        assertThat(results).hasSize(1);
        String firstResponse = results.iterator().next().toString();
        assertThat(firstResponse).contains("blue").contains("testing 123");
    }

    @Test
    public void testRawVoteList_ReturnsListOfZero() throws Exception {
        Page page = new PageImpl<Vote>(votes);
        when(mockVoteRepository.findAll(any(PageRequest.class))).thenReturn(page);

        TeacherController subject = new TeacherController(mockVoteRepository);
        Iterable<Vote> results = subject.rawVoteList();
        assertThat(results).hasSize(0);
    }

    @Test
    public void testRawVoteList_EnsureOrderOfTimestamps() throws Exception {
        votes.add(new Vote("testbed", "blue", "testing 1").setTimestamp(new Date(10000L)));
        votes.add(new Vote("testbed", "purple", "testing 2").setTimestamp(new Date(20000L)));
        Page page = new PageImpl<Vote>(votes);
        when(mockVoteRepository.findAll(any(PageRequest.class))).thenReturn(page);

        TeacherController subject = new TeacherController(mockVoteRepository);
        Iterable<Vote> results = subject.rawVoteList();
        assertThat(results).hasSize(2);
        String firstResponse = results.iterator().next().toString();
        assertThat(firstResponse).contains("blue").contains("testing 1");
    }
}
