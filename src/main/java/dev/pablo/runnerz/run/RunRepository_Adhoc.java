package dev.pablo.runnerz.run;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;
@Repository
public class RunRepository_Adhoc {
    private List<Run> runs = new ArrayList<>();
    void createRun(Run run){
        runs.add(run);
    }
    void updateRun(Run run, int id){
        Optional<Run> existingRun = findbyid(id);
        if(existingRun.isPresent()){
            runs.set(runs.indexOf(existingRun.get()), run);
        }
    }
    void deleteRun(int id){
        runs.removeIf(run -> run.id() == id);
    }
    List<Run> findAll(){
        return runs;
    }
    Optional<Run> findbyid(int id){
        return runs.stream().filter(run -> run.id() == id).findFirst();
    }
    @PostConstruct
    private void init(){
       /* runs.add(new Run(0, "AAAAAAAA", LocalDateTime.now(), LocalDateTime.now().plus(1, ChronoUnit.HOURS), 20, Location.INNER));
        runs.add(new Run(1, "BBBBBBBB", LocalDateTime.now(), LocalDateTime.now().plus(3, ChronoUnit.HOURS), 55, Location.OUTSIDE));
        runs.add(new Run(4, "BBBBBBBB", LocalDateTime.now(), LocalDateTime.now().plus(2, ChronoUnit.HOURS), 55, Location.OUTSIDE)); */
    }
}
