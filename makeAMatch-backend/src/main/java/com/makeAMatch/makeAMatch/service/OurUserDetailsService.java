package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.repository.OurUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OurUserDetailsService implements UserDetailsService {
    @Autowired
    private OurUserRepository ourUserRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return ourUserRepository.findByEmail(username).orElseThrow();
    }

    public Long getUserIdByEmail(String username) throws UsernameNotFoundException {
        Optional<OurUsers> ourUsers = ourUserRepository.findByEmail(username);
        return ourUsers.map(OurUsers::getId).orElse(-1L); // Provide a default value if optional is empty
    }

    public List<OurUsers> getAllUsers(){
        return ourUserRepository.getAllUsers();
    }

    public List<OurUsers> getAllUsersByRole(String role){
        return ourUserRepository.getAllUsersByRole(role);
    }



}
