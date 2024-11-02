package org.lakemarkhotel.controller;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.RoleAlreadyExistException;
import org.lakemarkhotel.model.Role;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.service.IRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles")

public class RoleController {
    private final IRoleService roleService;

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {

        return new ResponseEntity<>(roleService.getAllRoles(), FOUND);
    }
    @PostMapping("/create-new-role")
    public ResponseEntity<String> createRole(@RequestBody Role theRole) {
        try{
            roleService.CreateRole(theRole);
            return ResponseEntity.ok("New role is  created successfuly");
        }catch (RoleAlreadyExistException re){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(re.getMessage());
        }
    }
    @DeleteMapping("/delete/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId) {
        roleService.deleteRole(roleId);
    }
    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId) {
      return  roleService.removeAllUsersFromRole(roleId);
    }
     @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {

        return roleService.removeUserFromRole(userId, roleId);
    }
    @PostMapping("/assign-user-role")
    public  User assignUserToRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {

        return  roleService.assignRoleToUser(userId, roleId);
    }

}
