package org.lea.dirk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Profile;

import java.util.List;

@SpringBootApplication
public class SteamvoatApplication implements CommandLineRunner {

	@Autowired VoteRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(SteamvoatApplication.class, args);
	}

	@Override
	public void run(String... strings) throws Exception {
		Add4Votes();
	}

	// the integration tests depend on this seed data
    // add four votes, removing old copies if these exist (useful for interacting with real db)
	public void Add4Votes() {
        List<Vote> previous = repository.findByUuid("test-1");
        if (previous.size() > 0) {
            repository.delete(previous);
            repository.delete(repository.findByUuid("test-3"));
            repository.delete(repository.findByUuid("test-4"));
        }
        repository.save(new Vote("test-1", "green", "comment test-1 green"));
        repository.save(new Vote("test-1", "yellow", "comment test-1 yellow"));
        repository.save(new Vote("test-3", "green", ""));
        repository.save(new Vote("test-4", "green", "comment test-4 green"));
    }

	// additional seed data, not included by default
	// to satisfy integration tests, include this first and Add4Votes last.
	public void Add600Votes() {
		// create 600 votes
		for(int i=1; i<600; i++) {
			if (i%10 == 0) {
				String comment = "Comment " + i;
				repository.save(new Vote("auto", "yellow", comment)); }
			else {
				repository.save(new Vote("auto", "green", "")); }
		}
	}
}
