package com.example.demo.Infrastructure;

import com.example.demo.Application.WarrantyInputPort;
import com.example.demo.Domain.Warranty;
import com.example.demo.Domain.WarrantyService;
import com.itextpdf.text.DocumentException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import static org.bson.assertions.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class WarrantyControllerTest {

    @Mock
    private WarrantyService warrantyService;

    @InjectMocks
    private WarrantyController warrantyController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getWarrantyByProductId_ValidProductId_ReturnsWarranty() {
        // Arrange
        String productId = "123";
        Warranty expectedWarranty = new Warranty();
        when(warrantyService.getWarrantyByProductId(productId)).thenReturn(expectedWarranty);

        // Act
        Warranty result = warrantyController.getWarrantyByProductId(productId);

        // Assert
        assertEquals(expectedWarranty, result);
        verify(warrantyService).getWarrantyByProductId(productId);
    }

    @Test
    void editWarranty_ValidWarrantyIdAndWarranty() {
        // Arrange
        String warrantyId = "123";
        Warranty warranty = new Warranty();

        // Act
        warrantyController.editWarranty(warrantyId, warranty);

        // Assert
        verify(warrantyService).editWarranty(warrantyId, warranty);
    }

    @Test
    void generatePdf_ValidWarrantyId_ReturnsPdfResponse() throws IOException, DocumentException {
        // Arrange
        String warrantyId = "123";
        when(warrantyService.findWarranty(warrantyId)).thenReturn(new Warranty());

        // Act
        ResponseEntity<byte[]> response = warrantyController.generatePdf(warrantyId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_PDF, response.getHeaders().getContentType());
        assertNotNull(response.getBody());
        verify(warrantyService).findWarranty(warrantyId);
    }

}
