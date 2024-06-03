package dev.pablo.runnerz.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record User(
    @Positive int id, 
    @NotNull String username,
    String password) {

}
