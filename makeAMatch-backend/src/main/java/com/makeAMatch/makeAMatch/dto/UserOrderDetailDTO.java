package com.makeAMatch.makeAMatch.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.makeAMatch.makeAMatch.model.ProductDetail;
import com.makeAMatch.makeAMatch.model.UserOrder;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserOrderDetailDTO {

    private Long productSizeId;

    private int quantity;
}
