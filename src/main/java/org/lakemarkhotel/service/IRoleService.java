package org.lakemarkhotel.service;

import org.lakemarkhotel.model.Role;
import org.lakemarkhotel.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface IRoleService {
    List<Role> getAllRoles();
    Role CreateRole(Role theRole);
    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);

    User assignRoleToUser(Long userId, Long roleId);

    Role removeAllUsersFromRole(Long roleId);



}
