package dev.pablo.runnerz;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import dev.pablo.runnerz.run.Location;
import dev.pablo.runnerz.run.Run;
import dev.pablo.runnerz.run.RunRepository;
import systemMessages.WelcomeMessage;

@SpringBootApplication
public class RunnerzApplication {
	
	private static final Logger log = LoggerFactory.getLogger(RunnerzApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(RunnerzApplication.class, args);
		var WelcomeMessage = new WelcomeMessage();
		System.out.println(WelcomeMessage.getWelcomeMessage());
	}
	@Bean
		CommandLineRunner runner(RunRepository runRepository){
			return args -> {
				log.info("Welcome to Runnerz");
				/*Run run = new Run(0, "AAAAAAAA", LocalDateTime.now(), LocalDateTime.now().plus(1, ChronoUnit.HOURS), 20, Location.INNER);
				Run run2 = new Run(1, "BBBBBBBBBBB", LocalDateTime.now(), LocalDateTime.now().plus(1, ChronoUnit.HOURS), 10, Location.INNER);
				//runRepository.createRun(run);
				List<Run> runs = new ArrayList<Run>();
				runs.add(run);
				runs.add(run2);
				runs.add(new Run(2, "CCCCCCCCCCC", LocalDateTime.now(), LocalDateTime.now().plus(1, ChronoUnit.HOURS), 10, Location.INNER));
				log.info("Created "+runRepository.createListOfRun(runs)+" runs");*/
			}; 
		}
}
