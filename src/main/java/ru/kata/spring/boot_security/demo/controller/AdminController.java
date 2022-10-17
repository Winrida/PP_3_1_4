package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@Controller
public class AdminController {
    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }



    @GetMapping("/admin")
    public String adminPage(Model model, Principal principal) {
        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        return "admin";
    }

    @GetMapping("/admin/new")
    public String createUser(User user, Principal principal, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("users", userService.loadUserByUsername(principal.getName()));
        return "new";
    }

    @PostMapping("/admin/new")
    public String create(User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/{id}")
    public String show(@PathVariable("id") Integer id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "show";
    }

    @GetMapping("/admin/{id}/edit")
    public String edit(@PathVariable("id") Integer id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "edit";
    }


    @DeleteMapping("/admin/{id}")
    public String deleteUser(@PathVariable("id") Integer id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

    @PatchMapping("/admin/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }
}
