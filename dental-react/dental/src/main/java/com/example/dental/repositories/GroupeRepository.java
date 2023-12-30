package com.example.dental.repositories;

import com.example.dental.entities.Groupe;
import com.example.dental.entities.PW;
import com.example.dental.entities.Professor;
import com.example.dental.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface GroupeRepository extends JpaRepository<Groupe,Integer> {
    List<Groupe> findGroupesByProfessor(Professor professor);
    List<Groupe> findGroupesByStudents(Student student);
    List<Groupe> findGroupesByPws(PW pw);

}
