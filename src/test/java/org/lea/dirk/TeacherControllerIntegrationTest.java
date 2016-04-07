package org.lea.dirk;

import jdk.nashorn.internal.parser.JSONParser;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatExceptionOfType;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.hamcrest.Matchers.*;


import java.util.ArrayList;
import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SteamvoatApplication.class)
@WebAppConfiguration

public class TeacherControllerIntegrationTest {

    @Autowired private WebApplicationContext context;
    private MockMvc mockMvc;


    @Test
    public void testMvcRawVoteList() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        MvcResult mvcResult = mockMvc.perform(get("/teacher/rawlist"))
                .andExpect(status().isOk())
                .andReturn();
        String  strResult = mvcResult.getResponse().getContentAsString();
        System.err.println(">>" + strResult);
    }




}