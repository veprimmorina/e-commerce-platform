package com.example.demo.Infrastructure;

import com.example.demo.RabbitmqConfig.MessagingConfiguration;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitOutputAdapter {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public String getUserByUsername(){
        Object o = new Object();
        rabbitTemplate.convertAndSend(MessagingConfiguration.EXCHANGE,MessagingConfiguration.KEY, o);
        return "Sent";
    }
}
