package org.lakemarkhotel.repository;

import org.lakemarkhotel.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String role);

    boolean existsByName(Role role);
}
