package com.example.dental.controllers;

import com.example.dental.entities.*;
import com.example.dental.repositories.GroupeRepository;
import com.example.dental.repositories.PWRepository;
import com.example.dental.repositories.ProfessorRepository;
import com.example.dental.repositories.StudentRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController

@RequestMapping("/groupe")
public class GroupeController {
    @Autowired
    GroupeRepository groupeRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    ProfessorRepository professorRepository;
    @Autowired
    PWRepository pwRepository;
    @GetMapping
    public List<Groupe> findGroupes(){

        return groupeRepository.findAll();
    }
    @GetMapping("/{id}")
    public  ResponseEntity<Object> findGroupeById(@PathVariable int id){
        Groupe groupe=groupeRepository.findById(id).orElse(null);
        if(groupe==null){
            return new ResponseEntity<Object>("Child with id "+id+"not exist", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(groupe);

        }
    }
    @GetMapping("/student/{id}")
    public ResponseEntity<?> getByStudent(@PathVariable int id){
        Student student = studentRepository.findById(id).orElse(null);
        if(student == null)
            return new ResponseEntity<>(Map.of("message","student does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(groupeRepository.findGroupesByStudents(student));
    }
    @GetMapping("/professor/{id}")
    public ResponseEntity<?> getByProfessor(@PathVariable int id){
        Professor  professor= professorRepository.findById(id).orElse(null);
        if(professor == null)
            return new ResponseEntity<>(Map.of("message","prof does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(groupeRepository.findGroupesByProfessor(professor));
    }
    @PostMapping("/add/{id}")
    public ResponseEntity<Object> create(@RequestBody Groupe groupe,@PathVariable int id){
        Professor user = professorRepository.findById(id).orElse(null);
        if(user == null)
            return ResponseEntity.ok(Map.of("message","user does not exist"));
        else{
            groupe.setProfessor(user);
            groupeRepository.save(groupe);
            return ResponseEntity.ok(Map.of("message","group created successfully"));
        }

    }
    @PostMapping("/pw/{groupId}/{pwId}")
    public ResponseEntity<Object> addPwtoGroup(@PathVariable int groupId, @PathVariable int pwId){
        Groupe group = groupeRepository.findById(groupId).orElse(null);
        PW pw = pwRepository.findById(pwId).orElse(null);
        if(group == null || pw ==null){
            return new ResponseEntity<>(Map.of("message","PW or group does not exist"), HttpStatus.NOT_FOUND);
        }
        else{
            group.getPws().add(pw);
            groupeRepository.save(group);
            return ResponseEntity.ok(group);
        }
    }
    @GetMapping("/pw/{id}")
    public ResponseEntity<?> getByPw(@PathVariable int id){
        PW pw =  pwRepository.findById(id).orElse(null);
        if(pw == null)
            return new ResponseEntity<>(Map.of("message","PW does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(groupeRepository.findGroupesByPws(pw));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateGroupe(@PathVariable int id,@RequestBody Groupe newGroupe){
        Groupe oldGroupe=groupeRepository.findById(id).orElse(null);
        if(oldGroupe==null){
            return new ResponseEntity<Object>("groupe with id "+id+"not exist", HttpStatus.BAD_REQUEST);
        }else {
            newGroupe.setId(id);
            return ResponseEntity.ok(groupeRepository.save(newGroupe));

        }


    }
    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deleteGroupe(@PathVariable int id){
        Groupe groupe=groupeRepository.findById(id).orElse(null);
        if(groupe==null){
            return new ResponseEntity<Object>("groupe with id "+id+"not exist", HttpStatus.BAD_REQUEST);
        }else {
            groupeRepository.delete(groupe);
            return ResponseEntity.ok("groupe has been deleted");

        }
    }

}