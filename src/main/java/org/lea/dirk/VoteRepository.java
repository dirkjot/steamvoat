package org.lea.dirk;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;




@RepositoryRestResource(collectionResourceRel = "vote",
        path = "vote")
public interface VoteRepository extends JpaRepository<Vote, Long>  {

}



