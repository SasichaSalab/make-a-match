package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OurUserRepository extends JpaRepository<OurUsers,Long> {
    Optional<OurUsers> findByEmail(String email);

    @Query("SELECT DISTINCT o FROM OurUsers o WHERE o.role=:role")
    List<OurUsers> getAllUsersByRole(@Param("role") String role);
    @Query("SELECT DISTINCT o FROM OurUsers o")
    List<OurUsers> getAllUsers();

}
