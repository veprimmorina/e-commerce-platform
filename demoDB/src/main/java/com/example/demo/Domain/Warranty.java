package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Warranty")
public class Warranty {
    @Id
    private String warrantyID;
    private String warrantyDescription;
    private int warrantyLength;
    private String warrantyCoverageDetails;

    public Warranty() {}

    public Warranty( String warrantyDescription, int warrantyLength, String warrantyCoverageDetails) {

        this.warrantyDescription = warrantyDescription;
        this.warrantyLength = warrantyLength;
        this.warrantyCoverageDetails = warrantyCoverageDetails;
    }

    public void setWarrantyID(String warrantyID) {
        this.warrantyID = warrantyID;
    }

    public String getWarrantyID() {
        return warrantyID;
    }


    public String getWarrantyDescription() {
        return warrantyDescription;
    }

    public void setWarrantyDescription(String warrantyDescription) {
        this.warrantyDescription = warrantyDescription;
    }

    public int getWarrantyLength() {
        return warrantyLength;
    }

    public void setWarrantyLength(int warrantyLength) {
        this.warrantyLength = warrantyLength;
    }

    public String getWarrantyCoverageDetails() {
        return warrantyCoverageDetails;
    }

    public void setWarrantyCoverageDetails(String warrantyCoverageDetails) {
        this.warrantyCoverageDetails = warrantyCoverageDetails;
    }

}
