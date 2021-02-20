# Australia ACT election 2016

Data
from https://www.elections.act.gov.au/elections_and_voting/past_act_legislative_assembly_elections/2016-election/ballot-paper-preference-data-2016-election

Candidates.txt This file shows the name of each candidate listed on the ballot papers (in the form SURNAME, Given Name)
in the column: cname. Each candidate can be cross referenced to other files using the electorate identifier (ecode), the
candidate identifier (ccode)
and the party/group identifier (pcode).

Electorates.txt This file links the electorate code (ecode) with the name of the electorate. This code is used in
Candidates.txt and Groups.txt

Groups.txt This file shows the name of each party/group listed on the ballot papers in the column: pname and the
associated abbreviation listed in the column: pabbrev. Each party/group can be cross referenced to other files using the
electorate identifier (ecode) and the party/group identifier (pcode). Column: cands shows the number of candidates
standing for each party/group in an electorate.

cands Groups.txt Number of candidates standing for a party/group in an electorate.

ccode BrindabellaTotal.txt GinninderraTotal.txt KurrajongTotal.txt MurrumbidgeeTotal.txt YerrabiTotal.txt Candidates.txt
Candidate code – the key for these codes is in the file Candidates.txt. The candidate code has to be read with the
party/group code to identify an individual candidate.

cname Candidates.txt Candidate name in form SURNAME, Given Name.

ecode Candidates.txt Electorates.txt Groups.txt Electorate code – described in the file Electorates.txt “1” =
Brindabella, “2” = Ginninderra, “3” = Kurrajong, “4” = Murrumbidgee, “5” = Yerrabi

electorate Electorates.txt Electorate name.

pabbrev Groups.txt Party/group abbreviation.

pcode BrindabellaTotal.txt GinninderraTotal.txt KurrajongTotal.txt MurrumbidgeeTotal.txt YerrabiTotal.txt Candidates.txt
Groups.txt Party/group code – the key for these codes is in the file Groups.txt.

pindex BrindabellaTotal.txt GinninderraTotal.txt KurrajongTotal.txt MurrumbidgeeTotal.txt YerrabiTotal.txt
BallotPaperVersions.txt A unique number applied to each individual vote. Multiple records showing preferences with the
same pindex number belong to the same ballot paper.

pname Groups.txt Party/group name.
