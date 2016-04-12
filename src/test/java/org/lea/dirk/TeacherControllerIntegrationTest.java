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

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SteamvoatApplication.class)
@WebAppConfiguration

public class TeacherControllerIntegrationTest {

    @Autowired private WebApplicationContext context;
    private MockMvc mockMvc;

    @Test
    public void testMvc_RawVoteList_FromInitialized() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        MvcResult mvcResult = mockMvc.perform(get("/teacher/rawlist"))
                .andExpect(status().isOk())
                .andReturn();
        String  strResult = mvcResult.getResponse().getContentAsString();
        System.err.println(">>" + strResult);

        // TODO these test should really first parse the json results
        // note that these tests currently suggest that they test more then they do!!!
        assertThat(strResult).contains("test-1").contains("green").contains("comment test-1 green");
        assertThat(strResult).contains("test-1").contains("yellow").contains("comment test-1 yellow");
        assertThat(strResult).contains("test-3").contains("green");
        assertThat(strResult).contains("test-4").contains("green").contains("comment test-4 green");
    }

    @Test
    public void testMvc_FilteredVoteList_RemovesEmptyComments() throws Exception {

        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        MvcResult mvcResult = mockMvc.perform(get("/teacher/filteredlist"))
                .andExpect(status().isOk())
                .andReturn();
        String  strResult = mvcResult.getResponse().getContentAsString();
        System.err.println(">>" + strResult);

        // TODO these test should really first parse the json results
        assertThat(strResult).contains("test-1").contains("green").contains("comment test-1 green");
        assertThat(strResult).contains("test-1").contains("yellow").contains("comment test-1 yellow");
        assertThat(strResult).doesNotContain("test-3");
        assertThat(strResult).contains("test-4").contains("green").contains("comment test-4 green");
    }
}