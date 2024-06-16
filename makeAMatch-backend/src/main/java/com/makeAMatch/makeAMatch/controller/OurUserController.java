package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.model.Favorite;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.service.OurUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class OurUserController {
    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @GetMapping("/all")
    public List<OurUsers> getAllUsers(){
        return ourUserDetailsService.getAllUsers();
    }
    @GetMapping("/allUser")
    public List<OurUsers> getAllUsersByRole(){
        return ourUserDetailsService.getAllUsersByRole("USER");
    }
    @GetMapping("/allAdmin")
    public List<OurUsers> getAllAdminByRole(){
        return ourUserDetailsService.getAllUsersByRole("ADMIN");
    }
}
