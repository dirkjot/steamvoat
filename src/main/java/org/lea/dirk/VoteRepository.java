package org.lea.dirk;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "vote",
        path = "vote")
public interface VoteRepository extends JpaRepository<Vote, Long>  {
  Page<Vote> findByCommentNot(String comment, Pageable pageable);
}



