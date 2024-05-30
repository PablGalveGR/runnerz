package dev.pablo.runnerz.run;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import dev.pablo.runnerz.RunnerzApplication;


@Repository
public class RunRepository {
  private List<Run> runs = new ArrayList<>();
  private final JdbcClient jdbcClient;
  private static final Logger log = LoggerFactory
      .getLogger(RunnerzApplication.class);

  RunRepository(JdbcClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  public int createRun(Run run) {
    String query = "INSERT INTO RUN"
        + "(id, title, started_on, completed_on, km, location)"
        + "VALUES(?, ?, ?, ?, ?, ?);";
    var updated = jdbcClient.sql(query)
        .params(List.of(run.id(), run.title(), run.startedOn(),
            run.completedOn(), run.Km(), run.location().toString()))
        .update();
    Assert.state(updated == 1, "Failed to create Run: " + run.title());
    return updated;
  }

  public int createListOfRun(List<Run> runs) {
    int numberOfRuns = 0;
    for (Run run : runs) {
       numberOfRuns += createRun(run);
    }
    return numberOfRuns;
  }

  void updateRun(Run run, int id) {
    if (run.id() == id) {
      Optional<Run> existingRun = findbyid(id);
      if (existingRun.isPresent()) {
        String query = "UPDATE run SET title = ?, started_on = ?,"
            + "completed_on = ?, km = ?, location = ? WHERE id = ?;";
        var updated = jdbcClient.sql(query)
            .params(
                List.of(run.title(), run.startedOn(), run.completedOn(),
                    run.Km(), run.location().toString(), run.id()))
            .update();
        Assert.state(updated == 1, "Failed to Update Run: " + run.title());
      }
    }
  }

  void deleteRun(int id) {
    Optional<Run> existingRun = findbyid(id);
    if (existingRun.isPresent()) {
      String query = "DELETE FROM run WHERE id = :id;";
      var updated = jdbcClient.sql(query).param("id", id).update();
      Assert.state(updated == 1,
          "Failed to Delete Run: " + existingRun.get().title());
    }
  }

  List<Run> findAll() {
    String query = "SELECT * FROM run;";
    List<Run> runs = jdbcClient.sql(query).query(Run.class).list();
    return runs;
  }
  public int count(){
    int quantityOfRuns = findAll().size();
    return quantityOfRuns;   
  }
  Optional<Run> findbyid(int id) {
    String query = "SELECT * FROM run WHERE id = :id;";
    Optional<Run> run = jdbcClient.sql(query).param("id", id)
        .query(Run.class).optional();
    return run;
  }
  List <Run> findByTitle(String title){
    Optional<Runs> findedRuns = Optional.empty();
    String query = "SELECT * FROM run WHERE title LIKE '%:title%';";
    List <Run> runs = jdbcClient.sql(query).param("title", title).query(Run.class).list();
    //indedRuns = jdbcClient.sql(query).param("title", title).query(Run.class).optional();
    return runs;
  }
}
