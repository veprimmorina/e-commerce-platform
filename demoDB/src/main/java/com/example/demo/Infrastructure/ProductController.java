package com.example.demo.Infrastructure;

import com.example.demo.Application.ProductInputPort;
import com.example.demo.Domain.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/product")
public class ProductController implements ProductInputPort {
    @Autowired
    private ProductService productService;
    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/save")
    public Product saveDataModel(@RequestBody Product dataModel) {
        productService.saveDataModel(dataModel);
        return dataModel;
    }


    @GetMapping("delete/name/{name}")
    public String deleteByName(@PathVariable("name") String name){
        productService.deleteByname(name);
        return name;
    }
    @GetMapping("find/by/name/{name}")
    public List<Product> findByName(@PathVariable("name") String name){
        return productService.getByname(name);
    }

    @GetMapping("find/by/price/{price}")
    public List<Product> findByPrice(@PathVariable("price") double price){
        return this.productService.findByPrice(price);
    }

    @GetMapping("count/{name}")
    public int countByName(@PathVariable("name") String name){
        return this.productService.countByname(name);
    }

    @GetMapping("count")
    public long count(){
        return this.productService.count();
    }

    @GetMapping("get/last/{name}")
    public List<Product> getLastThree(@PathVariable("name")String name){
        return this.productService.getLastThree(name);
    }
    @Override
    @DeleteMapping("delete/by/id/{id}")
    public String deleteProduct(@PathVariable("id") String id) {
        productService.deleteProduct(id);
        return id;
    }

    @Override
    @GetMapping("get/total")
    public long countTotal() {
        return this.productService.countTotal();
    }

    @Override
    @GetMapping("count/by/name/{name}")
    public long countProductsByName(@PathVariable("name") String name) {
        return this.productService.countProductsByName(name);
    }

    @Override
    @PutMapping("update/{id}")
    public Product updateProduct(@PathVariable("id") String id, @RequestBody Product product) {
        return this.productService.updateProduct(id,product);
    }


    @Override
    @GetMapping("find/top/3")
    public List<Product> findTop3() {
        return this.productService.findTop3();
    }

    @Override
    @GetMapping("get/top/rated/{id}")
    public List<Product> findByRating(@PathVariable("id") int id) {
        return this.productService.findByRating(id);
    }

    @Override
    @GetMapping("find/best/rated")
    public List<Product> getTopRated() {
        return this.productService.getTopRated();
    }

    @Override
    @PostMapping("add/review/{productId}")
    public void addReview(@PathVariable("productId") String productId,@RequestBody Review review) {
        System.out.println(review.getRating());
        this.productService.addReview(productId,review);
    }

    @Override
    @GetMapping("get/product/by/id/{id}")
    public Product getProductByid(@PathVariable("id") String id) {
        return this.productService.getProductByid(id);
    }

    @Override
    @GetMapping("get/product/review/by/id/{id}")
    public List<Review> getProductReviewById(@PathVariable("id") String id) {
        return this.productService.getProductReviewById(id);
    }

    @Override
    @PostMapping("create/product")
    public void createProduct(@RequestBody Product product) {
        System.out.println(product.getSubCategoryId());
        this.productService.createProduct(product);
    }

    @Override
    @GetMapping("count/products")
    public long countProduct() {
        return this.productService.countProduct();
    }

    @Override
    @GetMapping("get/by/category/{subcategory}")
    public List<Product> getByCategory(@PathVariable("subcategory") String subcategory) {
        return this.productService.getByCategory(subcategory);
    }

    @Override
    @GetMapping("get/newest/products")
    public List<Product> getNewestProducts() {
        return this.productService.getNewestProducts();
    }

    @Override
    @GetMapping("search/{product}")
    public List<Product> searchProducts(@PathVariable("product") String product) {
        return this.productService.searchProducts(product);
    }

    @Override
    @PostMapping("order")
    public String orderProducts(@RequestBody CheckOutVO checkOutVO) throws MessagingException, DocumentException, IOException {

        String message = this.productService.orderProducts(checkOutVO.getProductVOList());
        List <ProductEmbeddable> products = checkOutVO.getProductVOList();
            if(message=="success") {
                sendEmail(checkOutVO.getUserEmail(), "Order Confirmation", "Dear "+checkOutVO.getName()+" \n \n You are accepting this email as a confirmation of your order. \n \n \n Attached to this email you can find your invoice! \n \n Thank you for choosing us!", products);
                return "success";
            }else {
                return "Not succesfully";
            }
    }

    @GetMapping("get/all")
    public List<Product> getAll(){
        return this.productService.getAll();
    }

    @Override
    @PutMapping("change/product/subcategory/{id}")
    public void changeProductSubCategory(@PathVariable("id") String id,@RequestBody Product product) {
        this.productService.changeProductSubCategory(id,product);
    }

    @Override
    @PutMapping("add/clicked/{id}")
    public void addClicked(@PathVariable("id") String id) {
        this.productService.addClicked(id);
    }

    @GetMapping("get/outOfStock")



    public void sendEmail(String to,String subject, String text, List<ProductEmbeddable> products) throws MessagingException, DocumentException, IOException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        ResponseEntity<byte[]> response = generateInvoicePdf(products);
        byte[] pdfBytes = response.getBody();

        ByteArrayResource pdfResource = new ByteArrayResource(pdfBytes);
        helper.addAttachment("Product_invoice.pdf", pdfResource);


        javaMailSender.send(message);
    }


    public ResponseEntity<byte[]> generateInvoicePdf(List<ProductEmbeddable> products) throws IOException, DocumentException {
        // Create a new document
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);

        // Open the document
        document.open();

        // Create a table with 5 columns
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);

        // Add table headers
        table.addCell(new PdfPCell(new Phrase("Image")));
        table.addCell(new PdfPCell(new Phrase("Name")));
        table.addCell(new PdfPCell(new Phrase("Price")));
        table.addCell(new PdfPCell(new Phrase("Quantity")));
        table.addCell(new PdfPCell(new Phrase("Total Price")));
        double totalPrice = 0;
        // Add products to the table
        for (ProductEmbeddable product : products) {
            String imagePath = product.getProductImage();
            Image image = Image.getInstance(imagePath);
            image.scaleToFit(200f, 200f);
            table.addCell(image);
            table.addCell(product.getProductName());
            table.addCell(""+product.getProductPrice()+"€");
            table.addCell(""+product.getQuantity());
            table.addCell(""+product.getProductPrice()*product.getQuantity()+"€");
            totalPrice+=(product.getProductPrice()*product.getQuantity());
        }
        Paragraph totalParagraph = new Paragraph("Total Price: "+totalPrice+" €");
        // Add the table to the document
        totalParagraph.setAlignment(Element.ALIGN_RIGHT);
        document.add(table);
        document.add(totalParagraph);
        // Close the document
        document.close();

        // Convert the document to a byte array
        byte[] pdfBytes = baos.toByteArray();

        // Set the content type and return the response
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "Product_" + ".pdf");
        headers.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }




    @GetMapping("/generate/pdf/{productId}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable("productId") String detailId) throws IOException, DocumentException {
        // Create a new document
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
        Product product = this.productService.getProductByid(detailId);
        // Open the document
        document.open();


        // Add custom information to the document
        Paragraph paragraph = new Paragraph("Details of Product");
        document.add(paragraph);
        Paragraph paragraph1 = new Paragraph("Product name: "+product.getProductName());
        Paragraph paragraph2 = new Paragraph("Product dimensions: "+product.getProductDetails().getProductDimensions());
        Paragraph paragraph3 = new Paragraph("Product Weight: "+product.getProductDetails().getWeight());
        Paragraph paragraph4 = new Paragraph("Product Description: "+product.getProductDetails().getDescription());
        Paragraph paragraph5 = new Paragraph("Product Price: "+product.getProductPrice());

        paragraph.setAlignment(Element.ALIGN_CENTER);
        paragraph1.setAlignment(Element.ALIGN_CENTER);
        paragraph2.setAlignment(Element.ALIGN_CENTER);
        paragraph3.setAlignment(Element.ALIGN_CENTER);
        paragraph4.setAlignment(Element.ALIGN_CENTER);
        paragraph5.setAlignment(Element.ALIGN_CENTER);
        document.add(paragraph);
        document.add(paragraph1);
        document.add(paragraph2);
        document.add(paragraph3);
        document.add(paragraph4);
        document.add(paragraph5);
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
        headers.setContentDispositionFormData("attachment", "Product_"+product.getSubCategoryId()+".pdf");
        headers.setContentLength(pdfBytes.length);

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}