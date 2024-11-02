package org.lakemarkhotel.service;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.RoleAlreadyExistException;
import org.lakemarkhotel.exception.UserAlreadyExistException;
import org.lakemarkhotel.exception.UserNameNotFoundException;
import org.lakemarkhotel.model.Role;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.repository.RoleRepository;
import org.lakemarkhotel.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoleService implements IRoleService{
    private final RoleRepository roleRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role CreateRole(Role theRole) {
        String roleName = "ROLE_"+theRole.getName().toUpperCase();
        Role role= new Role(roleName);
        if(roleRepository.existsByName(role)){
            throw new RoleAlreadyExistException(theRole.getName()+"role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
     this.removeAllUsersFromRole(roleId);
     roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {

        Optional<User> user= userRepository.findById(userId) ;
        Optional <Role> role = roleRepository.findById(roleId);

         if(role.isPresent() && role.get().getUsers().contains(user.get())){

             role.get().removeUserFromRole(user.get());
             roleRepository.save(role.get());
             return user.get();
         }
         throw new UserNameNotFoundException("USER NOT FOUND");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {

        Optional<User> user= userRepository.findById(userId) ;
        Optional <Role> role = roleRepository.findById(roleId);
       if(user.isPresent() && user.get().getRoles().contains(role.get())){
           throw new UserAlreadyExistException(user.get().getFirstName()
                   + "is already assigned to the" + role.get().getName() + "role");
       }
       if(role.isPresent()){
           role.get().assignRoleToUser(user.get());
           roleRepository.save(role.get());
       }

        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional <Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role :: removeAllUsersFromRole);

        return roleRepository.save(role.get());
    }
}
