package com.example.dental.controllers;

import com.example.dental.entities.*;
import com.example.dental.repositories.GroupeRepository;
import com.example.dental.repositories.StudentPwRepository;
import com.example.dental.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/student")
public class StudentController {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    StudentPwRepository studentPwRepository;
    @Autowired
    GroupeRepository groupeRepository;
    @GetMapping("/PWS/{studentId}")
    public Set<PW> getPratiqueWorksByStudent(@PathVariable int studentId) {
        List<StudentPW> studentPWs = studentPwRepository.findByStudentId(studentId);

        return studentPWs.stream()
                .map(StudentPW::getPw)
                .collect(Collectors.toSet());
    }
    @GetMapping
    public List<Student> findStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findStudentById(@PathVariable int id){
        Student student=studentRepository.findById(id).orElse(null);
        if(student==null){
            return new ResponseEntity<Object>("Student with id "+id+"not exist", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(student);

        }
    }
    @GetMapping("/pw/{id}")
    public ResponseEntity<?> getStudentPw(@PathVariable int id){
        Student user =  studentRepository.findById(id).orElse(null);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","User does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(studentRepository.findPwByStudent(id));
    }
    @GetMapping("/group/{id}")
    public List<Student> getStudentsByGroup(@PathVariable int id){

        return studentRepository.findStudentsByGroup(id);
    }
    @GetMapping("/professor/{id}")
    public List<Student> getStudentByProfessor(@PathVariable int id){
        return studentRepository.findStudentsByProfessor(id);
    }
    @PostMapping("/{id}")
    public ResponseEntity<?> createStudent(@RequestBody Student student,@PathVariable int id){
        student.setId(0);
        Groupe groupe = groupeRepository.findById(id).orElse(null);
        if(groupe == null)
            return ResponseEntity.ok(Map.of("message","groupe does not exist"));
        else{
            student.setGroupe(groupe);
            studentRepository.save(student);
            return ResponseEntity.ok(Map.of("message","student created successfully"));
        }


    }
    @PutMapping("/{id}/groupe/{idGroupe}")
    public ResponseEntity<Object> updateStudent(@PathVariable int id,@RequestBody Student newStudent,@PathVariable int idGroupe){
        Student oldStudent=studentRepository.findById(id).orElse(null);
        Groupe groupe = groupeRepository.findById(idGroupe).orElse(null);
        if(oldStudent==null) {
            return new ResponseEntity<Object>("student with id " + id + "not exist", HttpStatus.BAD_REQUEST);
        }else{ if(groupe == null)
                return ResponseEntity.ok(Map.of("message","groupe does not exist"));
            else{

            newStudent.setId(id);
            newStudent.setGroupe(groupe);
            return ResponseEntity.ok(studentRepository.save(newStudent));

        }}


    }
    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deleteStudent(@PathVariable int id){
        Student student=studentRepository.findById(id).orElse(null);
        if(student==null){
            return new ResponseEntity<Object>("student with id "+id+"not exist", HttpStatus.BAD_REQUEST);
        }else {
            studentRepository.delete(student);
            return ResponseEntity.ok("student has been deleted");

        }
    }

}

