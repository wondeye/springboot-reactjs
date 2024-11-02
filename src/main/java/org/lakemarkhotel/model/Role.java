package org.lakemarkhotel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Collection<User> users=new HashSet<>();

    public Role(String roleName) {
    }

    public void assignRoleToUser(User users) {
        users.getRoles().add(this);
        this.getUsers().add(users);
    }
    public void removeUserFromRole(User users) {
        users.getRoles().remove(this);
        this.getUsers().remove(users);
    }
    public void removeAllUsersFromRole() {
        if(this.getUsers()!=null) {
            List<User> roleUsers=this.getUsers().stream().toList();
            roleUsers.forEach(this :: removeUserFromRole);
        }

    }
    public String getName(){
        return name != null ? name : "";
    }
}
