package com.openclassrooms.starterjwt.payload.response;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class MessageResponseTest {

  @Test
  void setMessage_shouldSetMessage() {
    MessageResponse messageResponse = new MessageResponse("message");

    messageResponse.setMessage("updated");

    assertThat(messageResponse.getMessage()).isEqualTo("updated");
  }

}
