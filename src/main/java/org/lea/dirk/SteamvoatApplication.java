package org.lea.dirk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class SteamvoatApplication implements CommandLineRunner {

	@Autowired VoteRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(SteamvoatApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {
		repository.save(new Vote("test-1", "green", "comment test-1 green"));
		repository.save(new Vote("test-1", "yellow", "comment test-1 yellow"));
		repository.save(new Vote("test-3", "green", "comment test-3 green"));
		repository.save(new Vote("test-4", "green", "comment test-4 green"));
	}


}
