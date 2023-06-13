package com.example.demo.Infrastructure;

import com.example.demo.Application.WarrantyInputPort;
import com.example.demo.Domain.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/warranty")
public class WarrantyController implements WarrantyInputPort {


    @Autowired
    private WarrantyService warrantyService;
    @Autowired
    private ProductService productService;

    @Override
    @GetMapping("get/by/product/{productId}")
    public Warranty getWarrantyByProductId(@PathVariable("productId") String productId) {
        return this.warrantyService.getWarrantyByProductId(productId);
    }

    @Override
    @PutMapping("edit/product/{warrantyId}")
    public void editWarranty(@PathVariable("warrantyId") String warrantyId, @RequestBody Warranty warranty) {
        this.warrantyService.editWarranty(warrantyId,warranty);
    }

    @GetMapping("/generate/pdf/{warrantyId}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable("warrantyId") String warrantyId) throws IOException, DocumentException {
        // Create a new document
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
        Product product = this.productService.getProductByid(warrantyId);
        // Open the document
        document.open();


        // Add custom information to the document
        Paragraph paragraph = new Paragraph("Warranty");
        document.add(paragraph);
        Paragraph paragraph1 = new Paragraph("Warranty Description: "+product.getWarranty().getWarrantyDescription());
        Paragraph paragraph2 = new Paragraph("Warranty Length: "+product.getWarranty().getWarrantyLength()+" months");
        Paragraph paragraph3 = new Paragraph("Warranty coverage details: "+product.getWarranty().getWarrantyCoverageDetails());
        paragraph.setAlignment(Element.ALIGN_CENTER);
        paragraph1.setAlignment(Element.ALIGN_CENTER);
        paragraph2.setAlignment(Element.ALIGN_CENTER);
        paragraph3.setAlignment(Element.ALIGN_CENTER);
        document.add(paragraph);
        document.add(paragraph1);
        document.add(paragraph2);
        document.add(paragraph3);
        String imagePath = product.getProductImage();
        Image image = Image.getInstance(imagePath);
        image.scaleToFit(200f, 200f);
        image.setAlignment(Element.ALIGN_CENTER);
        document.add(image);
        // Close the document
        document.close();

        // Convert the document to a byte array
        byte[] pdfBytes = baos.toByteArray();

        // Set the content type and return the response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "Warranty_"+product.getWarranty().getWarrantyID()+".pdf");
        headers.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}
