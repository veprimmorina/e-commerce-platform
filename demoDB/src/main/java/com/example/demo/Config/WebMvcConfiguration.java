package com.example.demo.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/images/**")  // Map the URL path pattern
                .addResourceLocations("file:///C:/Users/TECHCOM/Desktop/ISASH-ECommerce-Project/demoDB/src/main/java/com/example/demo/Images/");  // Set the folder location
    }
}