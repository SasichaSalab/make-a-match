package com.makeAMatch.makeAMatch.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CountUserDTO {
    private int cart;
    private int waiting_order;
    private int sending_order;
    private int success_order;
    private int cancel_order;
    private int waiting_refund;
    private int success_refund;
    private int cancel_refund;
}
