package org.lakemarkhotel.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ManyToAny;
import java.util.Collection;
import java.util.HashSet;
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.PERSIST})

    @JoinTable(name="user_roles", joinColumns = @JoinColumn(name="user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))

    private Collection<Role>roles=new HashSet<>();



}
