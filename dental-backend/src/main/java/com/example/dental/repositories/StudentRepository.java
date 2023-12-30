package com.example.dental.repositories;

import com.example.dental.entities.PW;
import com.example.dental.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface StudentRepository  extends JpaRepository<Student,Integer> {
    @Query("SELECT s FROM Student s JOIN s.groupe g JOIN g.professor p WHERE p.id = :professorId")
    List<Student> findStudentsByProfessor(@Param("professorId") int professorId);
    @Query("SELECT s.groupe.pws FROM Student s WHERE s.id = :studentId")
    List<PW> findPwByStudent(@Param("studentId") int studentId);

    @Query("SELECT s FROM Student s WHERE s.groupe.id = :groupId")
    List<Student> findStudentsByGroup(@Param("groupId") int groupId);

}
