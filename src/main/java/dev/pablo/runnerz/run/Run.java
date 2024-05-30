package dev.pablo.runnerz.run;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record Run(
    int id, 
    @NotNull String title,
    @NotNull LocalDateTime startedOn, 
    @NotNull LocalDateTime completedOn,
    @Positive int Km, 
    Location location) {
  public Run {
    if (!completedOn.isAfter(startedOn)) {
      throw new IllegalArgumentException(
          "'Started on' must be earlier than 'completed on'");
    }
  }
}
