from . import ProcessAuNat
from . import ProcessAuQld


class ProcessRun:
    _input = 'input.json'
    _output = 'data.json'

    def run(self):
        pass

    # def _au_act_2016_10(self):
    #     ProcessAuAct('au-act-2016-10', '', self._input, self._output)

    # def _au_act_2020_10(self):
    #     ProcessAuAct('au-act-2020-10', '', self._input, self._output)

    def _au_nat_2016_07(self):
        ProcessAuNat('au-nat-2016-07', 2016, 7, 2,
                     '2016federalelection-all-candidates-nat-30-06-924.csv',
                     self._input, self._output)

    def _au_nat_2019_05(self):
        ProcessAuNat('au-nat-2019-05', 2019, 5, 18,
                     '2019federalelection-all-candidates-nat-30-04.csv',
                     self._input, self._output)

    def _au_qld_2015_01(self):
        ProcessAuQld('au-qld-2015-01', 2015, 1, 31,
                     'publicResults.xml', self._input, self._output)

    def _au_qld_2017_11(self):
        ProcessAuQld('au-qld-2017-11', 2017, 11, 25,
                     'publicResults.xml', self._input, self._output)

    # def _au_qld_2020_10(self):
    #     ProcessAuQld('au-qld-2020-11', '', self._input, self._output)


if __name__ == "__main__":
    ProcessRun().run()
