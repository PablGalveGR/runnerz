package dev.pablo.runnerz.run;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import dev.pablo.runnerz.run.RunRepository;
@Component
public class RunJsonDataLoader implements CommandLineRunner {
  private static final Logger log = LoggerFactory
      .getLogger(RunJsonDataLoader.class);
  private final RunRepository runRepository;
  private final ObjectMapper objectMapper;
  public RunJsonDataLoader (RunRepository runRepository, ObjectMapper objectMapper){
    this.runRepository = runRepository;
    this.objectMapper = objectMapper;
  }

  @Override
  public void run(String... args) throws Exception {
    // TODO Auto-generated method stub
    if(runRepository.count() == 0){
      try(InputStream inputstream = TypeReference.class.getResourceAsStream("/data/runs.json")){
        Runs allRuns = objectMapper.readValue(inputstream, Runs.class);
        log.info("Reading {} from a Json file and saving it", allRuns.runs().size());
        runRepository.createListOfRun(allRuns.runs());
      }catch(IOException e){
        throw new RuntimeException("Could't read data from the JSON");
      }
    }
    else{
      log.info("Not loading data beacuse it already are Runs");
    }
  }

}
