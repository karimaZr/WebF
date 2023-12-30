package com.example.dental.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

@NoArgsConstructor
public class StudentPW {
    @EmbeddedId
    private StudentPWPk id;
    @JoinColumn(name = "student_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne
    @JsonIgnoreProperties("studentPWS")
    private Student student;
    @JoinColumn(name = "pw_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne
    private PW pw;
    @Lob
    @Column(name = "imageFront", columnDefinition = "LONGBLOB")
    private byte[]imageFront;
    @Lob
    @Column(name = "imageSide", columnDefinition = "LONGBLOB")
    private byte[] imageSide;
    private  float alpha1;
    private  float alpha2;
    private  float alpha3;
    private  float beta1;
    private  float beta2;
    private  float beta3;
    private float note;
    private String time;
    @Temporal(TemporalType.DATE)
    private Date date;





}
