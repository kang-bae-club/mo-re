package com.kangbaeclub.more.filters;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class UserAuthenticationFilterTest {

    private MockMvc mockMvc;
    private UserAuthenticationFilter filter;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        filter = new UserAuthenticationFilter();
        mockMvc = MockMvcBuilders.standaloneSetup(new TestController()).addFilter(filter).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Authorization 헤더가 없는 경우 401 응답")
    void whenNoAuthorizationHeader_thenReturns401() throws Exception {
        // given
        String requestBody = "{\"test\": \"value\"}";

        // when & then
        mockMvc.perform(post("/test").contentType(MediaType.APPLICATION_JSON).content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(-401))
                .andExpect(jsonPath("$.message").value("check the authorization header"));
    }

    @Test
    @DisplayName("잘못된 Bearer 토큰 형식인 경우 401 응답")
    void whenInvalidBearerToken_thenReturns401() throws Exception {
        // given
        String requestBody = "{\"test\": \"value\"}";

        // when & then
        mockMvc.perform(
                        post("/test")
                                .header(HttpHeaders.AUTHORIZATION, "Invalid Token")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(-401))
                .andExpect(jsonPath("$.message").value("check the authorization header"));
    }

    @Test
    @DisplayName("올바른 Bearer 토큰으로 요청시 성공")
    void whenValidToken_thenSuccess() throws Exception {
        // given
        String requestBody = "{\"test\": \"value\"}";
        String token = "validToken";
        MvcResult result =
                mockMvc.perform(
                                post("/test")
                                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                                        .characterEncoding("UTF-8")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(requestBody))
                        .andExpect(status().isOk())
                        .andReturn();

        // controller가 처리하는 request body에 userId가 포함되었는지 확인
        Map map = objectMapper.readValue(result.getResponse().getContentAsString(), Map.class);
        assertEquals(map.get("userId"), "testUserId");
    }
}

// 테스트를 위한 더미 컨트롤러, 테스트를 위한 피드백 응답 포함
@RestController
class TestController {
    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        return ResponseEntity.ok("{\"userId\": \"" + userId + "\"}");
    }
}
