package com.makeAMatch.makeAMatch.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.makeAMatch.makeAMatch.model.OrderStatus;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.UserOrderDetail;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserOrderDTO {

    private List<UserOrderDetailDTO> details;

    private byte[] slip_image;

}
